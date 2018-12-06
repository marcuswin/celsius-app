import branchService from "../services/branch-service";

export const branchEvents = {
  // completeRegistration: (userId, method) => branchService.createEvent({ event: 'complete_registration', identity: userId, metadata: { fb_registration_method: method, method }}),
  // achieveLevel: (userId, description) => branchService.createBranchEvent({ event: 'achieve_level', identity: userId, content_items: [{ $og_description: description, description }]})
  completeRegistration: (userId, method) => branchService.createBranchEvent({ name: 'COMPLETE_REGISTRATION', user_data: { developer_identity: userId }, custom_data: { fb_registration_method: method, method }}),
  achieveLevel: (userId, description) => branchService.createBranchEvent({ name: 'ACHIEVE_LEVEL', user_data: { developer_identity: userId }, content_items: [{ $og_description: description, description }]})
}
