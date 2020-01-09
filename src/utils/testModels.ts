import { User } from "../ducks/userDuck";
import { Workout, Exercise, Comment, Review } from "../ducks/workoutDuck";

export const testUser: User = {
  username: "TestUser",
  email: "testuser@test.com",
  confirmed: false,
  u_id: "1234567",
  created: "2019-12-31T21:42:47.912Z",
  last_edited: "2019-12-31T21:42:47.912Z"
};

export const testUser2: User = {
  username: "TestUser2",
  email: "testuser2@test.com",
  confirmed: false,
  u_id: "1234567",
  created: "2019-12-31T21:42:47.912Z",
  last_edited: "2019-12-31T21:42:47.912Z"
};

export const testUser3: User = {
  username: "TestUser3",
  email: "testuser3@test.com",
  confirmed: false,
  u_id: "1234567",
  created: "2019-12-31T21:42:47.912Z",
  last_edited: "2019-12-31T21:42:47.912Z"
};
export const comments: Comment[] = [
  {
    created: "2019-12-31T21:42:47.912Z",
    user: testUser2,
    comment: "this is great!"
  },
  {
    created: "2019-12-31T21:42:47.912Z",
    user: testUser3,
    comment: "I Like this a lot!"
  }
];
export const sampleExercises: Exercise[] = [
  { name: "Deadlifts", sets: 5, repititions: 5, rest: "10", day: 1 },
  { name: "Military Press", sets: 5, repititions: 5, rest: "10", day: 1 },
  { name: "Squats", sets: 5, repititions: 5, rest: "10", day: 1 }
];

export const reviews: Review[] = [
  {
    created: "2019-12-31T21:42:47.912Z",
    user: testUser2,
    rating: 4,
    review: "this is a review"
  },
  {
    created: "2019-12-31T21:42:47.912Z",
    user: testUser3,
    rating: 5,
    review: "this is another review of the thing"
  }
];

export const workout: Workout = {
  name: "Example Workout Sample",
  user: testUser,
  days: 3,
  difficulty: 3,
  tags: ["test1", "test2", "test3"],
  created: "2019-12-31T21:42:47.912Z",
  exercises: sampleExercises,
  comments: comments,
  reviews: reviews,
  rating: 5,
  liked: 10
};
