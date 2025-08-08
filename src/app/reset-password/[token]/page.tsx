import NewPasswordClient from './NewPasswordClient';

interface PageProps {
  params: {
    token: string;
  };
}

export default function Page({ params }: PageProps) {
  return <NewPasswordClient token={params.token} />;
}