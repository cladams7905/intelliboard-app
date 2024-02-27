import { User } from '@utils/types/models'
import { createServerSupabaseClient, getUserDetails } from '@app/supabase/supabase-server';
import Navbar from './Navbar';

export default async function NavbarWrapper() {
    const supabase = createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    const userDetails = await getUserDetails();

    return <Navbar user={userDetails}/>;
}