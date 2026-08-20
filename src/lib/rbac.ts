export type Role = "ADMIN" | "TREASURER" | "AUDITOR" | "MEMBER";

const permissions: Record<Role, Set<string>> = {
  ADMIN: new Set(["admin.access", "groups.manage", "finance.manage", "reports.view"]),
  TREASURER: new Set(["finance.manage", "reports.view"]),
  AUDITOR: new Set(["reports.view"]),
  MEMBER: new Set([]),
};

export function hasPermission(role: string | null | undefined, permission: string): boolean {
  if (!role || !(role in permissions)) return false;
  return permissions[role as Role].has(permission);
}
