enum Permissions {
  ReadServerHealth = 'read:server_health',
  ReadStudentApplications = 'read:student_applications',
  ReadStaffApplications = 'read:staff_applications',
  AcceptStudentApplications = 'accept:student_applications',
  AcceptStaffApplications = 'accept:staff_applications',
  ReadAcceptedStaff = 'read:accepted_staff',
  ReadAcceptedStudents = 'read:accepted_students',
  CreateStudentUsers = 'create:student_users',
  CreateStaffUsers = 'create:staff_users',
  ReadJobsStatus = 'read:jobs_status',
}

export default Permissions
