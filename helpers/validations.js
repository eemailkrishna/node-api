const validate =async(body) => { 

    if(body.name=='' && body.email==''){      
       return ({"messages":'Validation error','error':'Email & password field required','status':'400'});  
      }
      else if(body.name==''){
        return ({"messages":'Validation error','error':'Name field required','status':'400'});
      }
      else if(body.email==''){
        return ({"messages":'Validation error','error':'Email field required','status':'400'});
      }
      else{
        return ({'status':'200'});
      }
    };
    module.exports = {validate}