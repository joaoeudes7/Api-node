import api from './app';

api.start().then(adrr => {
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

