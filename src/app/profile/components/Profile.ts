import axios from 'axios';
import Whatsapp from '@/app/service/wpp/whatsapp';

const serviceProfile = () => {
  const verificaCliente = async (userAuth: any) => {
    try {
      // const teste = await axios.get('/service/wpp/notifica/'+userAuth.email+'/verificar');
      // console.log('HostDevice:', teste.data.response);      

      const response = await axios.get(`/api/clientes?email=${userAuth.email}`);
      const userCliente = response.data;

      if (!userCliente) {
        // console.log('Cliente não encontrado, criando novo Cliente');
        const responsePost = await axios.post('/api/clientes', {
          nome: userAuth.name,
          email: userAuth.email,
          auth0_id: userAuth.sub,
          rotas: [],
          image: userAuth.picture
        });

        // console.log('Cliente é cadastrado: ', responsePost.data.email);
        return response.data;
      } else {
        // console.log('Cliente encontrado', userCliente.email); 
        return userCliente;
      }
    } catch (error) {
      return Response.json('Erro ao buscar cliente');
    }
  };

  const verificarNumero = async (email: string) => {
    try {
      await axios.get(`/service/wpp/notifica/${email}/verificar`);
      const response = await axios.get(`/service/wpp/notifica/${email}/hostdevice`);
      return response.data.response.response.phoneNumber.replace('@c.us', '');
    } catch (error) {
      console.error('Erro ao buscar número do cliente:', error);
      return null;
    }
  };
  return {
    verificaCliente,
    verificarNumero
  };
};

export default serviceProfile;

