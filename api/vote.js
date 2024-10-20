module.exports = async function (context, req) {
   const option = req.body.option;
   
   // Store vote count in memory for simplicity (you could also use a simple JSON file or Azure Table Storage)
   context.bindings.voteData = context.bindings.voteData || {};
   context.bindings.voteData[option] = (context.bindings.voteData[option] || 0) + 1;
   
   context.res = {
      status: 200,
      body: `Vote for ${option} recorded!`
   };
};
