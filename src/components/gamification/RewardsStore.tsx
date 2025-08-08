'use client';

import React, { useState } from 'react';
import { Card, CardBody, Badge, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { Reward } from '@/types';

interface RewardsStoreProps {
  rewards: Reward[];
  userPoints: number;
}

const RewardsStore: React.FC<RewardsStoreProps> = ({ rewards, userPoints }) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'virtual' | 'real' | 'educational' | 'career' | 'social'>('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'real': return 'danger';
      case 'career': return 'warning';
      case 'educational': return 'info';
      case 'social': return 'success';
      case 'virtual': return 'primary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'real': return 'bi-gift';
      case 'career': return 'bi-briefcase';
      case 'educational': return 'bi-book';
      case 'social': return 'bi-people';
      case 'virtual': return 'bi-star';
      default: return 'bi-box';
    }
  };

  const filteredRewards = rewards.filter(reward => 
    activeFilter === 'all' || reward.type === activeFilter
  );

  const availableRewards = filteredRewards.filter(r => !r.isRedeemed);
  const redeemedRewards = filteredRewards.filter(r => r.isRedeemed);

  const handleRedeem = (reward: Reward) => {
    if (userPoints >= reward.value) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    }
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              <i className="bi bi-shop me-2"></i>
              Rewards Store
            </h5>
            <div className="text-end">
              <div className="fw-bold text-primary">{userPoints.toLocaleString()}</div>
              <div className="small text-muted">Available Points</div>
            </div>
          </div>

          <div className="mb-3">
            <div className="btn-group btn-group-sm w-100">
              {[
                { key: 'all', name: 'All', icon: 'bi-collection' },
                { key: 'virtual', name: 'Virtual', icon: 'bi-star' },
                { key: 'real', name: 'Real', icon: 'bi-gift' },
                { key: 'educational', name: 'Educational', icon: 'bi-book' },
                { key: 'career', name: 'Career', icon: 'bi-briefcase' },
                { key: 'social', name: 'Social', icon: 'bi-people' }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key as any)}
                  className="flex-fill"
                >
                  <i className={`${filter.icon} me-1`}></i>
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="rewards-container">
            {availableRewards.map((reward) => (
              <div 
                key={reward.id} 
                className="reward-item border rounded p-3 mb-3 cursor-pointer"
                onClick={() => setSelectedReward(reward)}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-1">
                      <i className={`bi ${getTypeIcon(reward.type)} me-2 text-${getTypeColor(reward.type)}`}></i>
                      <h6 className="mb-0">{reward.name}</h6>
                    </div>
                    <p className="text-muted small mb-2">{reward.description}</p>
                    {reward.sponsor && (
                      <Badge bg="info" className="me-1 fs-6">
                        Sponsored by {reward.sponsor}
                      </Badge>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-primary fs-5">
                      {reward.value.toLocaleString()} pts
                    </div>
                    <Badge bg={getTypeColor(reward.type)} className="fs-6">
                      {reward.type}
                    </Badge>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    {userPoints >= reward.value ? (
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRedeem(reward);
                        }}
                      >
                        <i className="bi bi-check-circle me-1"></i>
                        Redeem
                      </Button>
                    ) : (
                      <Alert variant="warning" className="py-1 mb-0">
                        <small>
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          Need {reward.value - userPoints} more points
                        </small>
                      </Alert>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="small text-muted">
                      {userPoints >= reward.value ? 'Available' : 'Insufficient points'}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {redeemedRewards.length > 0 && (
              <div className="mt-4">
                <h6 className="text-success mb-3">
                  <i className="bi bi-check-circle me-1"></i>
                  Redeemed Rewards
                </h6>
                {redeemedRewards.map((reward) => (
                  <div 
                    key={reward.id} 
                    className="reward-item redeemed border rounded p-3 mb-2 cursor-pointer opacity-75"
                    onClick={() => setSelectedReward(reward)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 text-success">
                          <i className="bi bi-check-circle me-1"></i>
                          {reward.name}
                        </h6>
                        <p className="text-muted small mb-0">{reward.description}</p>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success">
                          -{reward.value.toLocaleString()} pts
                        </div>
                        <div className="small text-muted">
                          Redeemed {reward.redeemedAt ? new Date(reward.redeemedAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredRewards.length === 0 && (
              <div className="text-center text-muted py-4">
                <i className="bi bi-shop display-4"></i>
                <p className="mt-2">No rewards available for this filter.</p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Reward Detail Modal */}
      <Modal show={!!selectedReward} onHide={() => setSelectedReward(null)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`bi ${getTypeIcon(selectedReward?.type || 'virtual')} me-2 text-${getTypeColor(selectedReward?.type || 'virtual')}`}></i>
            {selectedReward?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <div className="reward-icon-large mb-3">
              <i className={`bi ${getTypeIcon(selectedReward?.type || 'virtual')} display-1 text-${getTypeColor(selectedReward?.type || 'virtual')}`}></i>
            </div>
            <h5>{selectedReward?.name}</h5>
            <p className="text-muted">{selectedReward?.description}</p>
            
            <div className="d-flex justify-content-center gap-2 mb-3">
              <Badge bg={getTypeColor(selectedReward?.type || 'virtual')}>
                {selectedReward?.type}
              </Badge>
              {selectedReward?.sponsor && (
                <Badge bg="info">
                  Sponsored by {selectedReward.sponsor}
                </Badge>
              )}
            </div>

            <div className="border rounded p-3 mb-3">
              <div className="fw-bold text-primary fs-4">
                {selectedReward?.value.toLocaleString()} points
              </div>
              <div className="text-muted">Cost</div>
            </div>

            {selectedReward?.isRedeemed ? (
              <Alert variant="success">
                <i className="bi bi-check-circle me-2"></i>
                Redeemed on {selectedReward.redeemedAt ? new Date(selectedReward.redeemedAt).toLocaleDateString() : 'N/A'}
              </Alert>
            ) : (
              <div>
                {userPoints >= (selectedReward?.value || 0) ? (
                  <Alert variant="success">
                    <i className="bi bi-check-circle me-2"></i>
                    You have enough points to redeem this reward!
                  </Alert>
                ) : (
                  <Alert variant="warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    You need {(selectedReward?.value || 0) - userPoints} more points to redeem this reward.
                  </Alert>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedReward(null)}>
            Close
          </Button>
          {selectedReward && !selectedReward.isRedeemed && userPoints >= selectedReward.value && (
            <Button 
              variant="success"
              onClick={() => {
                setShowRedeemModal(true);
                setSelectedReward(null);
              }}
            >
              <i className="bi bi-check-circle me-1"></i>
              Redeem Reward
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Redeem Confirmation Modal */}
      <Modal show={showRedeemModal} onHide={() => setShowRedeemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-check-circle text-success me-2"></i>
            Confirm Redemption
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-gift display-1 text-success mb-3"></i>
            <h5>Redeem Reward</h5>
            <p>Are you sure you want to redeem this reward for {(selectedReward?.value || 0).toLocaleString()} points?</p>
            <div className="border rounded p-3">
              <div className="fw-bold">{selectedReward?.name}</div>
              <div className="text-muted small">{selectedReward?.description}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRedeemModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="success"
            onClick={() => {
              // Handle redemption logic here
              setShowRedeemModal(false);
            }}
          >
            <i className="bi bi-check-circle me-1"></i>
            Confirm Redemption
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RewardsStore;
