const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/enroll-list', (req, res) => {
    res.sendFile(__dirname + '/enroll-list.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

app.get('/pricing', (req, res) => {
  res.sendFile(__dirname + '/pricing.html');
});

app.get('/write-exhibition', (req, res) => {
  res.sendFile(__dirname + '/write-exhibition-form.html');
});

app.get('/gathering', (req, res) => {
  res.sendFile(__dirname + '/gathering.html');
});

app.get('/gathering-single', (req, res) => {
    res.sendFile(__dirname + '/gathering-single.html');
});

app.get('/gathering-new', (req, res) => {
    res.sendFile(__dirname + '/gathering-new.html');
});

app.get("/exhibition", (req, res) => {
  res.sendFile(__dirname + "/exhibition.html");
});

app.get("/exhibition-single", (req, res) => {
  res.sendFile(__dirname + "/exhibition-single.html");
});

app.get("/myinfo", (req, res) => {
    res.sendFile(__dirname + "/my-info.html");
});

app.get("/mycalendar", (req, res) => {
    res.sendFile(__dirname + "/my-calendar.html");
});

app.get("/myreviews", (req, res) => {
    res.sendFile(__dirname + "/my-reviews.html");
});

app.get("/mygatherings", (req, res) => {
    res.sendFile(__dirname + "/my-gatherings.html");
});

app.get("/myparticipations", (req, res) => {
    res.sendFile(__dirname + "/my-participations.html");
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.use((req, res) => {
  res.sendFile(__dirname + '/error.html');
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log('The server is listening on port 3000');
});
