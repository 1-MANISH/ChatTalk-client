import { 
    Dashboard as DashboardIcon ,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Message as MessageIcon,
} 
from "@mui/icons-material";

export const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name: "Users",
        path: "/admin/users-management",
        icon: <ManageAccountsIcon />
    },
    {
        name: "Chats",
        path: "/admin/chats-management",
        icon: <GroupsIcon />
    },
    {
        name: "Messages",
        path: "/admin/messages-management",
        icon: <MessageIcon />
    }
]