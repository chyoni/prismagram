//Prisma가 공격자의 공격을 받지 않기위해 deep Query문을 제공해주지않음
//그니까 무슨말이냐면 유저안에 어떤 post가 있고 그 post는 다른 모델인데
//유저로 query문을 날려서 그 유저의 포스트를 알고싶어서 유저안에 포스트에대한 쿼리를날려도
//알려주지않음 하지만 난 유저안의 포스트들을 알고싶음
//그럴땐 $fragment를 사용해서 이렇게 작성해줘야함

export const USER_FRAGMENT = `
    fragment UserParts on User {
        id
        username
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
        }
        followers {
            id 
            username
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
        user {
            id
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
            user {
                id
                username 
            }
        }
        likes {
            id 
            user {
                id
                username
            }
        }
    }
`;
