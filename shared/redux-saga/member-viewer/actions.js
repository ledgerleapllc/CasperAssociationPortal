export const getPublicMembers = (payload, resolve) => ({
  type: 'GET_PUBLIC_MEMBERS',
  payload,
  resolve,
});

export const getPublicMemberDetail = (id, resolve, reject) => ({
  type: 'GET_PUBLIC_MEMBER_DETAIL',
  id,
  resolve,
  reject,
});
