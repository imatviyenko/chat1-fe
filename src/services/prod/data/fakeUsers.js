import constants from '../../../constants';

const fakeUsers = [
    {
        email: 'user1@gmail.com',
        displayName: 'User 1',
        status: constants.PROFILE_STATUS_ACTIVE,
        password: '111'
    },
    {
        email: 'user2@gmail.com',
        displayName: 'User 2',
        status: constants.PROFILE_STATUS_CONFIRMATION_PENDING,
        password: '222'
    },
    {
        email: 'user3@gmail.com',
        displayName: 'User 3',
        status: constants.PROFILE_STATUS_REGISTRATION_PENDING,
        password: '333'
    },
    {
        email: 'user4@gmail.com',
        displayName: 'User 4',
        status: constants.PROFILE_STATUS_DISABLED,
        password: '444'
    }    
];

export default fakeUsers;