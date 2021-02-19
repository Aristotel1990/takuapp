
import _ from 'lodash';
import moment from 'moment'
export const initialState = {
    basket: [],
    user: null
    ,
    token: localStorage.getItem('token'),
    errore:null,
    compDate:null
  };
  
  // Selector
  
  const reducer = (state, action) => {

    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
          errore:action.payload,
        };
       case 'MERR_TEDHENA':
          return{...state,basket:action.item,user:action.user}  
      case 'AUTH_ERROR':
        return {
          ...state,
          errore:action.payload
        }
       case 'UPDATE_DATA':
         const ttt=action.itemm;
         const time = moment(ttt.date).format()
         const uuu= action.itemm.user
         const v = _.find(state.basket,{id:action.itemm.id});

        const dBasket = [...state.basket];
        const sss =dBasket.map(x=>x.id===v.id?{...x,status:ttt.status,date:time,emri:ttt.emri,user:uuu,subjekti:ttt.subjekti,qyteti:ttt.qyteti,komenti:ttt.komenti,nr:ttt.nr } : x )
        console.log(sss);

        return {
          ...state,
          basket:sss}
        case 'UPDATE_STATUS':
            const {id,status,user} = action;   
            const det=action.date;
            const a = _.find(state.basket,{_id:id});
            
            const ar =state.basket.map(x=>x._id===a._id?{...x,status:status,user:user,date:det } : x )
            
            if(a){
            return{...state,basket:ar}
            }
      case 'DELETE_ITEM':
        const index = state.basket.findIndex(
          (basketItem) => basketItem._id === action.id
        );
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          newBasket.splice(index, 1);
  
        } else {
          console.warn(
            `Cant remove product (id: ${action.id}) as its not in basket!`
          )
        }
  
        return {
          ...state,
          basket: newBasket
        }
      case "AUTH_USER":
        return {
          ...state,
          token: action.token,
          user:action.user}
      case "USER_NULL":
            return {
              ...state,
              token:null,
              user:null
                 }
     case "UPDATE_USER":
          return {
                    ...state,
                    user:action.user
                       }   
      case "DATE":
        return {
                          ...state,
                          compDate:action.item
                             }    
      default:
        return state;
    }
  };
  
  export default reducer;