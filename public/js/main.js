
$(function() {
  $("#username_box").change(function() {
      // getting the value that user typed
    
      var checkString    = $("#username_box").val();
       $('#usernameCheck').remove();
      axios.post('/clientvalidate','username='+checkString).then(function(response){
         
        var usernameAvailable=response.data.userAvailability;

       if(usernameAvailable){
        
           $('#form-group').append('<h1 id="usernameCheck">Username available</h1>');
       }else{
           
        $('#form-group').append('<h1 id="usernameCheck">Username already exists</h1>');
       }
      }).catch(function (error) {
        
      });   
  });
});


  $(function(){
    $("#email_box").change(function() {
        // getting the value that user typed
      
        var checkString    = $("#email_box").val();
         $('#clientemailCheck').remove();
        axios.post('/clientvalidate','email='+checkString).then(function(response){
           
          var usernameAvailable=response.data.useremailAvailability;
  
         if(usernameAvailable){
          
             $('#form-group').append('<h1 id="clientemailCheck">Email available</h1>');
         }else{
             
          $('#form-group').append('<h1 id="clientemailCheck">Email already exists</h1>');
         }
        }).catch(function (error) {
          
        });
  


      
  });
});


  $(function() {
    $("#partnerid_box").change(function() {
        // getting the value that user typed
      
        var checkString    = $("#partnerid_box").val();
     
         $('#partneridCheck').remove();
        axios.post('/partnervalidate','partnerid='+checkString).then(function(response){
           
          var partnerAvailable=response.data.partnerAvailability;
  
         if(partnerAvailable){
          
             $('#form-group').append('<h1 id="partneridCheck">Partner id  available</h1>');
         }else{
             
          $('#form-group').append('<h1 id="partneridCheck">Partner id  already exists</h1>');
         }
        }).catch(function (error) {
          
        });
 });
 });

 $(function() {
    $("#partneremailid_box").change(function() {
        // getting the value that user typed
      
        var checkString    = $("#partneremailid_box").val();
     
         $('#partneremailidCheck').remove();
        axios.post('/partnervalidate','partneremail='+checkString).then(function(response){
           
          var partneremailAvailable=response.data.partneremailAvailability;
  
         if(partneremailAvailable){
          
             $('#form-group').append('<h1 id="partneremailidCheck">Partner email id  available</h1>');
         }else{
             
          $('#form-group').append('<h1 id="partneremailidCheck">Partner  email  id  already exists</h1>');
         }
        }).catch(function (error) {
          
        });
  
    
    });
    });
  

