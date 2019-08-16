var orgs = [
  {
      title:"20 Minutes Fake Ogg",
      region:"France",      
  },
  {
      title:"AFP Factuel",
      region:"France",      
  },
  {
      title:"AP Fact Check",
      region:"United States",      
  },
  {
      title:"Africa Check",
      region:"South Africa",      
  },
  {
      title:"Agencia Lupa",
      region:"Brazil",      
  },
  {
      title:"Alt News",
      region:"India",      
  },
    {
      title:"Animal Politico - El Sabueso",
      region:"Mexico",      
  },{
      title:"Aos Fatos",
      region:"Brazil",      
  },{
      title:"Australian Associated Press",
      region:"Australia",      
  },{
      title:"BOOM",
      region:"India",      
  }
];

$(document).ready(()=>{
   orgs.forEach(obj=>{
       var tpl = `
		<tr>
			<td>${obj.title}</td>
			<td>${obj.region}</td>
			<td>
				<a class="black-text" href="#!"><i class="material-icons">add</i> Add</a>
			</td>
		</tr>
		`;
       $("#orgList").append(tpl);
   }); 
});