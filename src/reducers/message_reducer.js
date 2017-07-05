import { MESSAGE_RECEIVED } from "../actions/types";

export default function(state = "", action) {
    switch (action.type) {
        case MESSAGE_RECEIVED:
            return action.payload;
            break;
        default:
            return state;
    }
}
