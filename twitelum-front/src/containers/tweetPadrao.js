import Tweet from '../components/Tweet'
import { connect } from 'react-redux'
import * as TweetsAPI from '../apis/tweetsAPI'


const mapDispatchToProps = (dispatch, props) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.removeTweet(props.tweetInfo._id))
        }
    }
}

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer



// class TweetPadrao extends Component {
//     funcaoRemove() {
//         store.dispatch(TweetsAPI.removeTweet())
//     }

//     render() {
//         return (
//             <Tweet removeHandler={ removeHandler } />
//         )
//     }
// }