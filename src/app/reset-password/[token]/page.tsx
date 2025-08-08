import NewPasswordClient from './NewPasswordClient';

// ✅ fără niciun tip extra
export default function Page(props: any) {
  return <NewPasswordClient token={props.params.token} />;
}
