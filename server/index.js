const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});

const lessonRouter = require('./routes/lessons');
const userRouter = require('./routes/users');
const teacherRouter = require('./routes/teacher');
const commentRouter = require('./routes/comments');
const bioRouter = require('./routes/bio');
const notificationRouter = require('./routes/notifications');
const exercisesRouter = require('./routes/exercises');
const AuthorizedStudentRouter = require('./routes/authorizedStudents');
const mediaRouter = require('./routes/media');
const timelineRouter = require('./routes/timeline');
const postCommentRouter = require('./routes/post-comments');
const path = require('path');

app.use('/l', lessonRouter);
app.use('/t', teacherRouter);
app.use('/u', userRouter);
app.use('/c', commentRouter);
app.use('/b', bioRouter);
app.use('/n', notificationRouter);
app.use('/access', AuthorizedStudentRouter);
app.use('/m', mediaRouter);
app.use('/tl', timelineRouter);
app.use('/pc', postCommentRouter);

app.use('/exercises', express.static(path.join('public/uploads')));
app.use('/api/exercises', exercisesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});