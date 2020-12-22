import { getUser } from '../../utils/auth';

export default {
  loading: false,
  user: getUser()
}
