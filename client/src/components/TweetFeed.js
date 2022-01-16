// //APP
// import { BrowserRouter, Route } from "react-router-dom";

// import { NavLink } from "react-router-dom";
// import React, { useEffect, useReducer } from "react";
// import socketIOClient from "socket.io-client";

// import { TwitterTweetEmbed } from "react-twitter-embed";

// import axios from "axios";

// class Twitterfeed extends React.Component {
//   render() {
//     return (
//       <div className="ui container">
//         <div className="introduction"></div>

//         <h1 className="ui header">
//           <div className="content">
//             Real Time Tweet Streamer
//             <div className="sub header">Powered by Twitter data</div>
//           </div>
//         </h1>

//         <div className="ui container">
//           <BrowserRouter>
//             <Navbar />
//             <Route exact path="/" component={RuleList} />
//             <Route exact path="/rules" component={RuleList} />
//             <Route exact path="/tweets" component={TweetFeed} />
//           </BrowserRouter>
//         </div>
//       </div>
//     );
//   }
// }

// const Navbar = () => {
//   return (
//     <div className="ui two item menu">
//       <NavLink to="/tweets" className="item" target="_blank">
//         New Tweets
//       </NavLink>
//       <NavLink to="/rules" className="item" target="_blank">
//         Manage Rules
//       </NavLink>
//     </div>
//   );
// };

// const reduce = (state, action) => {
//   switch (action.type) {
//     case "add_tweet":
//       return {
//         ...state,
//         tweets: [action.payload, ...state.tweets],
//         error: null,
//         isWaiting: false,
//         errors: [],
//       };
//     case "show_error":
//       return { ...state, error: action.payload, isWaiting: false };
//     case "add_errors":
//       return { ...state, errors: action.payload, isWaiting: false };
//     case "update_waiting":
//       return { ...state, error: null, isWaiting: true };
//     default:
//       return state;
//   }
// };

// const TweetFeed = () => {
//   const initialState = {
//     tweets: [],
//     error: {},
//     isWaiting: true,
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { tweets, error, isWaiting } = state;

//   const streamTweets = () => {
//     let socket;

//     if (process.env.NODE_ENV === "development") {
//       socket = socketIOClient("http://localhost:3001/");
//     } else {
//       socket = socketIOClient("/");
//     }

//     socket.on("connect", () => {});
//     socket.on("tweet", (json) => {
//       if (json.data) {
//         dispatch({ type: "add_tweet", payload: json });
//       }
//     });
//     socket.on("heartbeat", (data) => {
//       dispatch({ type: "update_waiting" });
//     });
//     socket.on("error", (data) => {
//       dispatch({ type: "show_error", payload: data });
//     });
//     socket.on("authError", (data) => {
//       console.log("data =>", data);
//       dispatch({ type: "add_errors", payload: [data] });
//     });
//   };

//   const reconnectMessage = () => {
//     const message = {
//       title: "Reconnecting",
//       detail: "Please wait while we reconnect to the stream.",
//     };

//     if (error && error.detail) {
//       return (
//         <div>
//           <ErrorMessage key={error.title} error={error} styleType="warning" />
//           <ErrorMessage
//             key={message.title}
//             error={message}
//             styleType="success"
//           />
//           <Spinner />
//         </div>
//       );
//     }
//   };

//   const errorMessage = () => {
//     const { errors } = state;

//     if (errors && errors.length > 0) {
//       return errors.map((error) => (
//         <ErrorMessage key={error.title} error={error} styleType="negative" />
//       ));
//     }
//   };

//   const waitingMessage = () => {
//     const message = {
//       title: "Still working",
//       detail: "Waiting for new Tweets to be posted",
//     };

//     if (isWaiting) {
//       return (
//         <React.Fragment>
//           <div>
//             <ErrorMessage
//               key={message.title}
//               error={message}
//               styleType="success"
//             />
//           </div>
//           <Spinner />
//         </React.Fragment>
//       );
//     }
//   };

//   useEffect(() => {
//     streamTweets();
//   }, []);

//   const showTweets = () => {
//     if (tweets.length > 0) {
//       return (
//         <React.Fragment>
//           {tweets.map((tweet) => (
//             <Tweet key={tweet.data.id} json={tweet} />
//           ))}
//         </React.Fragment>
//       );
//     }
//   };

//   return (
//     <div>
//       {reconnectMessage()}
//       {errorMessage()}
//       {waitingMessage()}
//       {showTweets()}
//     </div>
//   );
// };

// const Tweet = ({ json }) => {
//   const { id } = json.data;

//   const options = {
//     cards: "hidden",
//     align: "center",
//     width: "550",
//     conversation: "none",
//   };

//   return <TwitterTweetEmbed options={options} tweetId={id} />;
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "show_rules":
//       return { ...state, rules: action.payload, newRule: "" };
//     case "add_rule":
//       return {
//         ...state,
//         rules: [...state.rules, ...action.payload],
//         newRule: "",
//         errors: [],
//       };
//     case "add_errors":
//       return { ...state, rules: state.rules, errors: action.payload };
//     case "delete_rule":
//       return {
//         ...state,
//         rules: [...state.rules.filter((rule) => rule.id !== action.payload)],
//       };
//     case "rule_changed":
//       return { ...state, newRule: action.payload };
//     case "change_loading_status":
//       return { ...state, isLoading: action.payload };
//     default:
//       return state;
//   }
// };

// const RuleList = () => {
//   const initialState = { rules: [], newRule: "", isLoading: false, errors: [] };
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const exampleRule = "from:twitterdev has:links";
//   const ruleMeaning = `This example rule will match Tweets posted by 
//      TwtterDev containing links`;
//   const operatorsURL =
//     "https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/integrate/build-a-rule";
//   const rulesURL = "/api/rules";

//   const createRule = async (e) => {
//     e.preventDefault();
//     const payload = { add: [{ value: state.newRule }] };

//     dispatch({ type: "change_loading_status", payload: true });
//     try {
//       const response = await axios.post(rulesURL, payload);
//       if (response.data.body.errors)
//         dispatch({ type: "add_errors", payload: response.data.body.errors });
//       else {
//         dispatch({ type: "add_rule", payload: response.data.body.data });
//       }
//       dispatch({ type: "change_loading_status", payload: false });
//     } catch (e) {
//       dispatch({
//         type: "add_errors",
//         payload: [{ detail: e.message }],
//       });
//       dispatch({ type: "change_loading_status", payload: false });
//     }
//   };

//   const deleteRule = async (id) => {
//     const payload = { delete: { ids: [id] } };
//     dispatch({ type: "change_loading_status", payload: true });
//     await axios.post(rulesURL, payload);
//     dispatch({ type: "delete_rule", payload: id });
//     dispatch({ type: "change_loading_status", payload: false });
//   };

//   const errors = () => {
//     const { errors } = state;

//     if (errors && errors.length > 0) {
//       return errors.map((error) => (
//         <ErrorMessage key={error.title} error={error} styleType="negative" />
//       ));
//     }
//   };

//   const rules = () => {
//     const { isLoading, rules } = state;

//     const message = {
//       title: "No rules present",
//       details: [
//         `There are currently no rules on this stream. Start by adding the rule 
//         below.`,
//         exampleRule,
//         ruleMeaning,
//       ],
//       type: operatorsURL,
//     };

//     if (!isLoading) {
//       if (rules && rules.length > 0) {
//         return rules.map((rule) => (
//           <Rule
//             key={rule.id}
//             data={rule}
//             onRuleDelete={(id) => deleteRule(id)}
//           />
//         ));
//       } else {
//         return (
//           <ErrorMessage
//             key={message.title}
//             error={message}
//             styleType="warning"
//           />
//         );
//       }
//     } else {
//       return <Spinner />;
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       dispatch({ type: "change_loading_status", payload: true });

//       try {
//         const response = await axios.get(rulesURL);
//         const { data: payload = [] } = response.data.body;
//         dispatch({
//           type: "show_rules",
//           payload,
//         });
//       } catch (e) {
//         dispatch({ type: "add_errors", payload: [e.response.data] });
//       }

//       dispatch({ type: "change_loading_status", payload: false });
//     })();
//   }, []);

//   return (
//     <div>
//       <form onSubmit={(e) => createRule(e)}>
//         <div className="ui fluid action input">
//           <input
//             type="text"
//             autoFocus={true}
//             value={state.newRule}
//             onChange={(e) =>
//               dispatch({ type: "rule_changed", payload: e.target.value })
//             }
//           />
//           <button type="submit" className="ui primary button">
//             Add Rule
//           </button>
//         </div>
//         {errors()}
//         {rules()}
//       </form>
//     </div>
//   );
// };

//  export const Rule = ({ data, onRuleDelete }) => {
//    return (
//      <div className="ui segment">
//        <p>{data.value}</p>
//        <div className="ui label">tag: {data.tag}</div>
//        <button
//          className="ui right floated negative button"
//          onClick={() => onRuleDelete(data.id)}
//        >
//          Delete
//        </button>
//      </div>
//    );
//  };

// const ErrorMessage = ({ error, styleType }) => {
//   const errorDetails = () => {
//     if (error.details) {
//       return error.details.map(detail => <p key={detail}>{detail}</p>);
//     } else if (error.detail) {
//       return <p key={error.detail}>{error.detail}</p>;
//     }
//   };

//   const errorType = () => {
//     if (error.type) {
//       return (
//         <em>
//           See
//           <a href={error.type} target="_blank" rel="noopener noreferrer">
//             {" "}
//             Twitter documentation{" "}
//           </a>
//           for further details.
//         </em>
//       );
//     }
//   };

//   return (
//     <div className={`ui message ${styleType}`}>
//       <div className="header">{error.title}</div>
//       {errorDetails()}
//       {errorType()}
//     </div>
//   );
// };

// const Spinner = () => {
//   return (
//     <div>
//       <div className="ui active centered large inline loader"></div>
//     </div>
//   );
// };

// export default Twitterfeed;