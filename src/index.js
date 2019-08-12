import app from './app';

app.listen(3000, (err, adrr) => {
  console.log(`Running in ${adrr}`);
});

export default app;
