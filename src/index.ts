import api from './app';

api.serve.listen(3000, (err: Error, adrr: string) => {
  console.log(`
  ███████╗ █████╗ ███████╗████████╗██╗███████╗██╗   ██╗
  ██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║██╔════╝╚██╗ ██╔╝
  █████╗  ███████║███████╗   ██║   ██║█████╗   ╚████╔╝
  ██╔══╝  ██╔══██║╚════██║   ██║   ██║██╔══╝    ╚██╔╝
  ██║     ██║  ██║███████║   ██║   ██║██║        ██║
  ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝╚═╝        ╚═╝

  in ${new Date()}
  source: https://github.com/joaoeudes7/API-NODE-ES6

  Running in ${adrr}
  Running in ${adrr}/docs
  `);
});

