import _ from 'loadash';
import { DO_LOGIN } from '../actions';

export default function( state={}, action ) {

	switch (action.type) {

		case DO_LOGIN:
			return _.mapKeys(action.payload.data);

		case DO_REGISTER:
			return _.mapKeys(action.payload.data);
			
		default:
			return state;

	}

}