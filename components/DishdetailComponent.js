import React, { Component, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  PanResponder,
  Share,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseURL";
import { postComment, postFavorite } from "../redux/ActionCreators";

import { Rating, AirbnbRating } from "react-native-ratings";

import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (mycomment) => dispatch(postComment(mycomment)),
});

function RenderDish(props) {
  const dish = props.dish;

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };

  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 200) return true;
    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + dish.name + " to favorite?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress();
              },
            },
          ],
          { cancelable: false }
        );

        return true;
      }
      if (recognizeComment(gestureState))
        Alert.alert(
          "Add Comment",
          "Are you sure you wish to add comment to " + dish.name + " ?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                toggleModal();
              },
            },
          ],
          { cancelable: false }
        );

      return true;
    },
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  const handleSubmit = () => {
    var d = new Date();
    var n = d.toISOString();
    var date = n;
    var commentsLength = props.comments.comments.length;
    var mycomment = {
      dishId: props.dishID,
      comment: comment,
      author: author,
      rating: rating,
      date: date,
      id: commentsLength,
    };
    props.handleAddComment(mycomment);
  };

  const shareDish = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: title + ": " + message + " " + url,
        url: url,
      },
      {
        dialogTitle: "Share " + title,
      }
    );
  };

  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        {...panResponder.panHandlers}
      >
        <Card>
          <Card.Title>{dish.name}</Card.Title>
          <Card.Image source={{ uri: baseURL + dish.image }} />
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={styles.icons}>
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={showModal}
              onDismiss={toggleModal}
              onRequestClose={toggleModal}
            >
              <View style={styles.modal}>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={60}
                  showRating
                  onFinishRating={ratingCompleted}
                />

                <View style={styles.modalInput}>
                  <Icon
                    style={{ marginRight: 10 }}
                    name={"user"}
                    type="font-awesome"
                    color="lightgrey"
                  />
                  <TextInput
                    placeholder="Author"
                    value={author}
                    onChangeText={(text) => setAuthor(text)}
                  />
                </View>

                <View style={styles.modalInput}>
                  <Icon
                    style={{ marginRight: 10 }}
                    name={"comment"}
                    type="font-awesome"
                    color="lightgrey"
                  />
                  <TextInput
                    placeholder="Comment"
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                  />
                </View>

                <Button
                  style={{ marginVertical: 20 }}
                  color="#512DAB"
                  title="Submit"
                  onPress={handleSubmit}
                />

                <Button
                  style={{ marginVertical: 20 }}
                  color="grey"
                  title="Close"
                  onPress={() => {
                    toggleModal();
                  }}
                />
              </View>
            </Modal>
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                props.favorite
                  ? console.log("Already Favorite")
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name={"pencil"}
              type="font-awesome"
              color="purple"
              onPress={toggleModal}
            />
            <Icon
              raised
              reverse
              name="share"
              type="font-awesome"
              color="#51D2A8"
              style={styles.cardItem}
              onPress={() =>
                shareDish(dish.name, dish.description, baseURL + dish.image)
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"--" + item.author + ", " + item.date}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  addComment(dishId, rating, author, comment) {
    this.props.postComment(dishId, rating, author, comment);
  }

  static navigationOptions = {
    title: "Dish Details",
  };

  render() {
    const dishId = this.props.route.params.dishId;

    return (
      <ScrollView>
        <RenderDish
          dishID={dishId}
          comments={this.props.comments}
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          handleAddComment={() => this.addComment()}
        />

        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modalInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DAB",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
