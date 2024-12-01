import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {serverUrl} from "../../constants/config"


const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:`${serverUrl}/api/v1/`}),
    tagTypes:["Chat","User","Message","AdminStats","AdminUsers","AdminChats","AdminMessages"], // for optimistic updates - cashing

    endpoints:(builder)=>({
        myChats:builder.query({
            query:()=>({
                url:"chat/my",
                credentials:"include"
            }),
            providesTags:["Chat"],
        }),
        searchUser:builder.query({
            query:(name)=>({
                url:`user/search?name=${name}`,
                credentials:"include"
            }),
            providesTags:["User"]
        }),
        sendFriendRequest:builder.mutation({
            query:(data)=>({
                url:`user/sendRequest`,
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["User"]
        }),
        getNotifications:builder.query({
            query:()=>({
                url:`user/notifications`,
                credentials:"include"
            }),
            keepUnusedDataFor:0,
        }),
        acceptFriendRequest:builder.mutation({
            query:(data)=>({
                url:`user/acceptRequest`,
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"]
        }),
        getChatDetails:builder.query({
            query:({chatId,populate=false})=>{
                
                let url = `chat/${chatId}`
                if(populate){
                    url += `?populate=true`
                }
                return {
                    url,
                    credentials:"include"
                }
            },
            providesTags:["Chat"]
        }),
        getMyMessages:builder.query({
            query:({chatId,page})=>({
                url:`chat/messages/${chatId}?page=${page}`,
                credentials:"include"
            }),
            keepUnusedDataFor:0,
        }),
        sendAttachments:builder.mutation({
            query:(data)=>({
                url:`chat/message`,
                method:"POST",
                credentials:"include",
                body:data
            }),
     
        }),
        myGroups:builder.query({
            query:()=>({
                url:`chat/my/groups`,
                credentials:"include"
            }),
            providesTags:["Chat"]
        }),
        availableFriends:builder.query({
            query:(chatId)=>{
                let url = "user/friends"
                if(chatId)
                    url += `?chatId=${chatId}`

                return {
                    url,
                    credentials:"include"
                }
            },
            providesTags:["Chats"]
        }),
        createNewGroup:builder.mutation({
            query:({name,members})=>({
                url:`chat/new`,
                method:"POST",
                credentials:"include",
                body:{name,members}
            }),
            invalidatesTags:["Chat"],
        }),
        renameGroup:builder.mutation({
            query:({chatId,name})=>({
                url:`chat/${chatId}`,
                method:"PUT",
                credentials:"include",
                body:{name}
            }),
            invalidatesTags:["Chat"],
        }),
        removeGroupMember:builder.mutation({
            query:({chatId,userId})=>({
                url:`chat/removeMember`,
                method:"PUT",
                credentials:"include",
                body:{chatId,userId}
            }),
            invalidatesTags:["Chat"],
        }),
        addGroupMembers:builder.mutation({
            query:({chatId,members})=>({
                url:`chat/addMembers`,
                method:"PUT",
                credentials:"include",
                body:{chatId,members}
            }),
            invalidatesTags:["Chat"],
        }),
        deleteChat:builder.mutation({
            query:(chatId)=>({
                url:`chat/${chatId}`,
                method:"DELETE",
                credentials:"include"
            }),
            invalidatesTags:["Chat"]
        }),
        leaveGroup:builder.mutation({
            query:(chatId)=>({
                url:`chat/leave/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"]
        }),
        getAdminDashboardStats:builder.query({
            query:()=>({
                url:`admin/stats`,
                credentials:"include"
            }),
            providesTags:["AdminStats"]
        }),
        getAllUsersForAdmin:builder.query({
            query:()=>({
                url:`admin/users`,
                credentials:"include"
            }),
            providesTags:["AdminUsers"]
        }),
        getAllChatsForAdmin:builder.query({
            query:()=>({
                url:`admin/chats`,
                credentials:"include"
            }),
            providesTags:["AdminChats"]
        }),
        getAllMessagesForAdmin:builder.query({
            query:()=>({
                url:`admin/messages`,
                credentials:"include"
            }),
            providesTags:["AdminMessages"]
        })
    })
})


export default api

export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useGetChatDetailsQuery,
    useGetMyMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useCreateNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
    useGetAdminDashboardStatsQuery,
    useGetAllUsersForAdminQuery,
    useGetAllChatsForAdminQuery,
    useGetAllMessagesForAdminQuery
} = api