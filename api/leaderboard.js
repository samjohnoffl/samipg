module.exports = async function (context, req) {
   context.bindings.voteData = context.bindings.voteData || {};
   context.res = {
      status: 200,
      body: context.bindings.voteData
   };
};
