const express=require('express');const path=require('path');const app=express();const PORT=process.env.PORT||10000;
app.use(express.json());app.use(express.urlencoded({extended:true}));app.use(express.static(__dirname));
let companies=[{id:1,name:'AdGem',type:'Offerwall',status:true}];
app.get('/admin',(q,r)=>r.sendFile(path.join(__dirname,'admin.html')));
app.get('/api/health',(q,r)=>r.json({ok:true,service:'reward-app'}));
app.get('/api/companies',(q,r)=>r.json(companies));
app.post('/api/companies',(q,r)=>{if(!q.body.name)return r.status(400).json({error:'اسم الشركة مطلوب'});let c={id:Date.now(),name:String(q.body.name),type:String(q.body.type||'Offerwall'),status:true};companies.push(c);r.status(201).json(c)});
app.delete('/api/companies/:id',(q,r)=>{companies=companies.filter(c=>c.id!==Number(q.params.id));r.json({ok:true})});
app.listen(PORT,()=>console.log('Reward App running on '+PORT));
