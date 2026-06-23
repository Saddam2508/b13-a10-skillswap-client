import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Bookmark,
  FileText,
  CreditCard,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, Users } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
  const user = await getUserSession();

  const clientNavLinks = [
    { icon: House, href: "/dashboard/client", label: "Dashboard" },
    { icon: Bell, href: "/dashboard/client/post-task", label: "Post a Task" },
    { icon: Briefcase, href: "/dashboard/client/my-tasks", label: "My Tasks" },
    { icon: FileText, href: "/dashboard/client/proposals", label: "Proposals" },
    { icon: Person, href: "/profile", label: "Profile" },
  ];

  const freelancerNavLinks = [
    { icon: House, href: "/dashboard/freelancer", label: "Dashboard" },
    {
      icon: Magnifier,
      href: "/dashboard/freelancer/browse-tasks",
      label: "Browse Tasks",
    },
    {
      icon: FileText,
      href: "/dashboard/freelancer/my-proposals",
      label: "My Proposals",
    },
    {
      icon: Briefcase,
      href: "/dashboard/freelancer/active-projects",
      label: "Active Projects",
    },
    {
      icon: CreditCard,
      href: "/dashboard/freelancer/earnings",
      label: "Earnings",
    },
    {
      icon: Person,
      href: "/dashboard/freelancer/profile",
      label: "Edit Profile",
    },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
    { icon: Briefcase, href: "/dashboard/admin/tasks", label: "Manage Tasks" },
    {
      icon: CreditCard,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
    },
  ];

  const navLinksMap = {
    client: clientNavLinks,
    freelancer: freelancerNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "client"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
