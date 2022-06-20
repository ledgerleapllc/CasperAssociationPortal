export const getPublicMembers = (payload, resolve) => ({
  type: 'GET_PUBLIC_MEMBERS',
  payload,
  resolve,
});

export const getPublicMemberDetail = (
  id,
  public_address_node,
  resolve,
  reject
) => ({
  type: 'GET_PUBLIC_MEMBER_DETAIL',
  id,
  public_address_node,
  resolve,
  reject,
});
