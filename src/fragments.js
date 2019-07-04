//Prisma가 공격자의 공격을 받지 않기위해 deep Query문을 제공해주지않음
//그니까 무슨말이냐면 유저안에 어떤 post가 있고 그 post는 다른 모델인데
//유저로 query문을 날려서 그 유저의 포스트를 알고싶어서 유저안에 포스트에대한 쿼리를날려도
//알려주지않음 하지만 난 유저안의 포스트들을 알고싶음
//그럴땐 $fragment를 사용해서 이렇게 작성해줘야함

export const USER_FRAGMENT = `
    fragment UserParts on User {
        id
        username
        avatar
        email
        firstName
        lastName
        bio
        posts {
            id
            caption
        }
        following {
            id
            username
            avatar
            bio 
        }
        followers {
            id 
            username
            avatar
            bio
        }
    }
`;

//만약 fragment를 쓰기싫다 짜증난다 하면
//타입을 정의해줘서 만들어야함 그걸 seeUser로 했음 확인

export const FULL_POST = `
    fragment FullPost on Post {
        id
        location
        caption
        createdAt
        user {
            id
            avatar
            username
        }
        files {
            id 
            url
            post {
                location
                caption
            }
        }
        comments {
            id
            text
            createdAt
            user {
                id
                avatar
                username 
            }
        }
        likes {
            id 
            user {
                id
                avatar
                username
            }
        }
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            id
            username
            avatar
        }
        messages {
            id
            text
            from {
                id
                username
                avatar
            }
            to {
                id
                username
                avatar
            }
        }
    }
`;

export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            avatar
            username
        }
        post {
            user {
                id
            }
        }
    }
`;

export const LIKE_FRAGMENT = `
    post {
        user {
            id
        }
    }
`;

export const NOTIFICATION_FRAGMENT = `
    fragment NotificationParts on Notification {
        id
        createdAt
        from {
            id
            avatar
            username 
        }
        to {
            id
            avatar
            username
        }
        type
        post {
            id
            files {
                id
                url 
            }
        } 
    }
`;
