const soap = require('soap')
const wsdl = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
soap.createClient(wsdl,(err,Client)=>{
	if(err){
		console.log(err);
	}else{
		console.log('Funcionou!');
		Client.consultaCEP({
			//informe aqui o cep ex: cep:'58600-000' ou cep:'58600000'
			cep: '58600-000'
		},(err,res)=>{
			console.log(res);
		})
	}
})