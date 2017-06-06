import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERRORS,
  SET_ADD_CARD_MESSAGE,
  SET_USER_DATA,
  SET_CREDIT_CARDS,
  SET_DEFAULT_CARD,
  ADD_CREDIT_CARD,
  REMOVE_CREDIT_CARD,
  SET_LOADING_USER_ACTIONS
} from '../constants/';

const initialState = {
  authenticated: false,
  errors: undefined,
  user: {
    name: '',
    lastname: '',
    email: '',
    username: ''
  },
  loadingUserActions: false,
  creditCardDefault: undefined,
  creditCards: undefined,
  cardMessage: undefined
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        errors: []
      };
    case UNAUTH_USER:
      return {
        ...state,
        user: null,
        authenticated: false,
        errors: [],
        creditCardDefault: null,
        creditCards: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        errors: null
      };
    case SET_ADD_CARD_MESSAGE:
      return {
        ...state,
        cardMessage: action.payload
      };
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        errors: []
      };
    case SET_CREDIT_CARDS:
      return {
        ...state,
        creditCards: action.payload
      };
    case SET_DEFAULT_CARD: {
      const creditCards = { ...state.creditCards };
      Object.keys(creditCards).forEach((key) => {
        if (creditCards[key].id === action.payload.id) {
          creditCards[key].default = true;
        } else {
          creditCards[key].default = false;
        }
      });
      return {
        ...state,
        creditCardDefault: action.payload,
        creditCards
      };
    }
    case SET_LOADING_USER_ACTIONS: {
      return {
        ...state,
        loadingUserActions: action.payload
      };
    }
    case ADD_CREDIT_CARD:
      return {
        ...state,
        creditCards: {
          ...state.creditCards,
          [`${action.payload.id}`]: action.payload
        }
      };
    case REMOVE_CREDIT_CARD: {
      const cards = { ...state.creditCards };
      const card = { ...cards[action.payload.id] };
      delete cards[action.payload.id];
      if (card.default) {
        cards[action.payload.defaultId].default = true;
        console.log('card remove', cards);
        return {
          ...state,
          creditCards: cards,
          creditCardDefault: cards[action.payload.defaultId]
        };
      }
      return {
        ...state,
        creditCards: cards
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
