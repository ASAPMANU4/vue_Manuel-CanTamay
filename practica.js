new Vue({
   //Especificar la zona de actuacion de Vue
  el:"#miPagina",

  // Esta seccion de VUE sirve para declarar Variables
  // Y constantes.
  data:{
  	mensaje:'HOLA MUNDO CRUEL again',
  	alumno:'',
   nombre:'',
   especie:'',
  	edad:0,
   editando:0,
   indice:0,
   buscar:'',
   mascotas:[{nombre:'Goldi',especie:'Canina',edad:9},
             {nombre:'Zuma',especie:'Felina',edad:4},
             {nombre:'Toño',especie:'Canina',edad:5}
            ],

   especies:[
               {clave:1,nombre:'Canina'},
               {clave:2,nombre:'Felina'},
               {clave:3,nombre:'Ave'}
            ],



  },

  // Este objeto permite crear funciones y/o procedimeintos 
  methods:{
   //aumentarEdad:function(){
      //this.edad=Number(this.edad)+1;
   //},

   //disminuirEdad:function(){
      //this.edad=Number(this.edad)-1;
   //},

 agregarMascota:function(){

      if(this.nombre && this.especie && this.edad){
      // Construimos un objeto de tipo mascota para insertar en el array
      var unaMascota={nombre:this.nombre,especie:this.especie,edad:this.edad};

      // Agrego un objeto mascota
      this.mascotas.push(unaMascota);
      this.limpiarHtml();

      //enviamos el foco al primer componente al html/nombre de la mascota, se debe agregar a todas las interfaces
      this.$refs.nombre.focus();

      //aca agregamos el mensaje de exito
      Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Se ha guardado exitosamente',
         showConfirmButton: false,
         timer: 2000
       })
   }
   else{
      Swal.fire({
         position: 'top end',
         icon:'error',
         title: 'Debe capturar todo los datos',
         showConfirmButton: false,
         timer: 2000
      });
   }},
      
   limpiarHtml:function(){
     this.nombre='';
     this.especie='';
     this.edad=''; 
   },

   eliminarMascota:function(pos){
      //var pregunta=confirm('Estas seguro de la eliminacion');

      //if (pregunta)
         //console.log('voy a eliminar el:' + pos);
      //this.mascotas.splice(pos,1);
      //else
         //console.log('Se arrepintio');


         //ventana de SWEAT ALERT
         Swal.fire({
           title: 'Estas seguro?',
           text: "No se podra reveritir esta accion!",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'SI, borra esto!'
         }).then((result) => {
           if (result.isConfirmed) {
            this.mascotas.splice(pos,1);
            //Si dice que si, sera eliminada la mascota seleccionada
             Swal.fire(
               'Eliminado!',
               'La mascota ha sido eliminada.',
               'success'
             )
           }
         });
         //fin de ventana de SWEAT  ALERT 
   },
   editarMascota:function(pos){
      this.nombre=this.mascotas[pos].nombre;
      this.especie=this.mascotas[pos].especie;
      this.edad=this.mascotas[pos].edad;
      this.editando=1;
      this.indice=pos;
   },

   cancelar:function(){
      this.limpiarHtml();
      this.editando=0;
   },

   guardarEdicion:function(){
      //modifico los valores del array de objetos
      this.mascotas[this.indice].nombre=this.nombre;
      this.mascotas[this.indice].especie=this.especie;
      this.mascotas[this.indice].edad=this.edad;

      //limpiamos los componentes HTML
      this.limpiarHtml();

      //Indicamos que terminamos de editar, (activando el boton agregar/azul)
      this.editando=0;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Los cambios han sido guardados',
        showConfirmButton: false,
        timer: 1500
      });
   },

   


  },
  // FIN DE METHODS

  //Seccion para calcular valor automaticamente
  computed:{
      numeroMascotas:function(){
         var nun=0;
         num =this.mascotas.length;
         return num;
      },

      filtroMascotas:function(){
         return this.mascotas.filter((mascota)=>{
               return mascota.nombre.toLowerCase().match(this.buscar.toLowerCase().trim()) || 
                     mascota.especie.toLowerCase().match(this.buscar.toLowerCase().trim()) 
         });
      }
  }

});