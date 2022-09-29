const SUPABASE_URL = 'https://brulbkgurviccbjegwdn.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydWxia2d1cnZpY2NiamVnd2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM4ODE1OTcsImV4cCI6MTk3OTQ1NzU5N30.Gj7MdCMXmHCK96smfmJ3As3mqB_QPLujl1hFDOgR2w8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createItem(item) {
    // Insert the item in supabase, returns a single row
    return await client.from('lists').insert(item).single();
}

export async function getItems() {
    // > Part B: Get all items for this user from supabase
    return await client.from('lists').select().order('created_at');
}

export async function buyItem(id) {
    // > Part C: call update (set complete to true) for the item that
    // matches the correct id. Returns a single record:
    return await client.from('lists').update({ bought: true }).eq('id', id).single();
}

export async function deleteAllItems() {
    // > Part D: delete all items for this user in supabase:
    return await client.from('lists').delete().eq('item', true);
}

/* export async function deleteBoughtItems() {
    const user = getUser();

    // > Part D: delete bought items for this user in supabase:
    return await client.from('lists').delete().eq('user_id', user.id).eq('bought', true);
} */

export async function deleteCompleted() {
    return await client.from('lists').delete().match({ bought: true });
}
