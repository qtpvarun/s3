import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPassport, defaultValue } from 'app/shared/model/passport.model';

export const ACTION_TYPES = {
  FETCH_PASSPORT_LIST: 'passport/FETCH_PASSPORT_LIST',
  FETCH_PASSPORT: 'passport/FETCH_PASSPORT',
  CREATE_PASSPORT: 'passport/CREATE_PASSPORT',
  UPDATE_PASSPORT: 'passport/UPDATE_PASSPORT',
  DELETE_PASSPORT: 'passport/DELETE_PASSPORT',
  RESET: 'passport/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPassport>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PassportState = Readonly<typeof initialState>;

// Reducer

export default (state: PassportState = initialState, action): PassportState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PASSPORT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PASSPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PASSPORT):
    case REQUEST(ACTION_TYPES.UPDATE_PASSPORT):
    case REQUEST(ACTION_TYPES.DELETE_PASSPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PASSPORT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PASSPORT):
    case FAILURE(ACTION_TYPES.CREATE_PASSPORT):
    case FAILURE(ACTION_TYPES.UPDATE_PASSPORT):
    case FAILURE(ACTION_TYPES.DELETE_PASSPORT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSPORT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSPORT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PASSPORT):
    case SUCCESS(ACTION_TYPES.UPDATE_PASSPORT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PASSPORT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/passports';

// Actions

export const getEntities: ICrudGetAllAction<IPassport> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PASSPORT_LIST,
  payload: axios.get<IPassport>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPassport> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PASSPORT,
    payload: axios.get<IPassport>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPassport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PASSPORT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPassport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PASSPORT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPassport> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PASSPORT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
