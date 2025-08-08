import NewPasswordClient from './NewPasswordClient';

export default async function Page({ params }: { params: { token: string } }) {
  return <NewPasswordClient token={params.token} />;
}