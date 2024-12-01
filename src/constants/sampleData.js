export const sampleChats = [
    {
        _id:"1",
        name:"Raghav",
        avatar:["https://i.pravatar.cc/300"],
        groupChat:false,
        members:[
            "1",
            "2"
        ]
    },
    {
        _id:"2",
        name:"Manish",
        avatar:["https://i.pravatar.cc/300","https://i.pravatar.cc/300","https://i.pravatar.cc/300"],
        groupChat:true,
        members:[
            "1",
            "2"
        ]
    },
    {
        _id:"3",
        name:"Devik",
        avatar:["https://i.pravatar.cc/300"],
        groupChat:false,
        members:[
            "1",
        ]
    },



]

export const sampleUsers = [
      {
        name:"Raghav",
        avatar:"https://i.pravatar.cc/300",
        _id:1,
      },
      {
        name:"Manish",
        avatar:"https://i.pravatar.cc/300",
        _id:2,
      },
      {
        name:"Devik",
        avatar:"https://i.pravatar.cc/300",
        _id:3,
      },
]

export const sampleNotifications = [
      {
        sender:{
            name:"Raghav",
            avatar:"https://i.pravatar.cc/300",
        },
        _id:1,
      },
      {
        sender:{
            name:"Manish",
            avatar:"https://i.pravatar.cc/300",
        },
        _id:2,
      },
      {
        sender:{
            name:"Devik",
            avatar:"https://i.pravatar.cc/300",
        },
        _id:3,
      },
]

export const sampleMessages = [
    {
        attachments:[
            // {
            //     public_id:"asddfdfsen",
            //     url:"https://www.w3schools.com/w3images/lights.jpg",
            // },
        ],
        content:"Bonjour shaktiman bsdk",
        _id:"1",
        sender:{
            _id:"user_id",
            name:"chomu"

        },
        chat:"chatId",
        createdAt:"2022-01-01T00:00:00.000Z"
    },
    {
        attachments:[
            {
                public_id:"asddfdsdsdsdsdfsen 2",
                url:"https://www.w3schools.com/html/mov_bbb.mp4",
            },
        ],
        // content:"Bonjour shaktiman bsdk 2",
        _id:"2",
        sender:{
            _id:"1",
            name:"chomu 2"

        },
        chat:"chatId 2",
        createdAt:"2022-01-01T00:00:00.000Z"
    },
    {
        attachments:[
            {
                public_id:"asddfdsdsfsen 3",
                url:"https://www.w3schools.com/html/horse.mp3",
            },
        ],
        // content:"Bonjour shaktiman bsdk 2",
        _id:"3",
        sender:{
            _id:"1",
            name:"chomu 2"

        },
        chat:"chatId 3",
        createdAt:"2022-01-01T00:00:00.000Z"
    }
]

export const userSample = {
    name:"Raghav",
    avatar:"https://i.pravatar.cc/300",
    _id:"1",
}

export const dashboardData = {
    users:[
        {
          name:"Raghav Patidar",
          avatar:"https://i.pravatar.cc/300",
          _id:1,
          username:"raghavpatidar",
          friends:20,
          groups:5,
        },
        {
          name:"Manish Patidar",
          avatar:"https://i.pravatar.cc/300",
          _id:2,
          username:"manishpatidar",
          friends:20,
          groups:5,
        },
        {
          name:"Devik Patidar",
          avatar:"https://i.pravatar.cc/300",
          _id:3,
          username:"devikpatidar",
          friends:20,
          groups:5,
        },
    ],
    chats:[
        {
            _id:"1",
            name:"Random Group 1",
            avatar:["https://i.pravatar.cc/300","https://i.pravatar.cc/300","https://i.pravatar.cc/300"],
            groupChat:false,
            members:[
                {_id:"1",avatar:"https://i.pravatar.cc/300"},
                {_id:"2",avatar:"https://i.pravatar.cc/300"},
            ],
            totalMembers:2,
            totalMessages:10,
            creator:{
                name:"Raghav",
                avatar:"https://i.pravatar.cc/300",
            }
            
        },
        {
            _id:"2",
            name:"Random Group 2",
            avatar:["https://i.pravatar.cc/300","https://i.pravatar.cc/300","https://i.pravatar.cc/300"],
            groupChat:false,
            members:[
                {_id:"1",avatar:"https://i.pravatar.cc/300"},
                {_id:"2",avatar:"https://i.pravatar.cc/300"},
                {_id:"3",avatar:"https://i.pravatar.cc/300"},
            ],
            totalMembers:3,
            totalMessages:10,
            creator:{
                name:"Devik",
                avatar:"https://i.pravatar.cc/300",
            }
            
        },
    ],
    messages:[
        {
            _id:"1",
            sender:{
                _id:"user_id",
                avatar:"https://i.pravatar.cc/300",
                name:"Raghav",
            },
            chat:"chat_id_1",
            groupChat:false,
            content:"Hello Bonjour",
            attachments:[
                {
                    public_id:"asddfdfsen",
                    url:"https://www.w3schools.com/w3images/lights.jpg",
                },
            ],
            createdAt:"2024-09-01T00:00:00.000Z"
        },
        {
            _id:"2",
            sender:{
                _id:"user_id_2",
                avatar:"https://i.pravatar.cc/300",
                name:"Raghav",
            },
            chat:"chat_id_2",
            groupChat:true,
            content:"Radhee Radhee",
            attachments:[
                {
                    public_id:"asddfdfsen",
                    url:"https://www.w3schools.com/w3images/lights.jpg",
                },
                {
                    public_id:"asddsddsdfdfsen",
                    url:"https://www.w3schools.com/html/mov_bbb.mp4",
                },
            ],
            createdAt:"2024-09-01T00:00:00.000Z"
        },
        {
            _id:"3",
            sender:{
                _id:"user_id_3",
                avatar:"https://i.pravatar.cc/300",
                name:"Raghav",
            },
            chat:"chat_id_3",
            groupChat:false,
            content:"Hello Bonjour",
            attachments:[
                
            ],
            createdAt:"2024-09-01T00:00:00.000Z"
        }
        
    ]

}