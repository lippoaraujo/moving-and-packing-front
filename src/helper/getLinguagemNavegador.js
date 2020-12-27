export default {
  methods: {
    getLinguagemNavegador,
  }
};


function getLinguagemNavegador () {
  return (navigator.languages && navigator.languages[0]) || "";
}