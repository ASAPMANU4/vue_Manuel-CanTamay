new Vue({

	el:"#miPagina2",
	data:{
		nombre:'',
		primerApellido:'',
		segundoApellido:'',
		edad:0,
		indice:0,
		buscar:'',
      editando:0,
   propietarios:[{nombre:'rodriguez',primerApellido:'canto', segundoApellido:'tamay', edad:21},
             {nombre:'manuel',primerApellido:'canto', segundoApellido:'chi', edad:21},
             {nombre:'german',primerApellido:'uitz', segundoApellido:'canul', edad:21}
            ],
			},

   methods:{

  agregarPropietario:function(){

      if(this.nombre && this.primerApellido && this.segundoApellido && this.edad){
      // Construimos un objeto de tipo propietario para insertar en el array
      var unPropietario={nombre:this.nombre,primerApellido:this.primerApellido,segundoApellido:this.segundoApellido,edad:this.edad};

      // Agrego un objeto mascota
      this.propietarios.push(unPropietario);
      this.limpiarHtml();

      //enviamos el foco al primer componente al html/nombre del propietario, se debe agregar a todas las interfaces
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
     this.primerApellido='';
     this.segundoApellido='';
     this.edad=''; 
   },

   eliminarPropietario:function(pos){
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
            this.propietarios.splice(pos,1);
            //Si dice que si, sera eliminada el propietario seleccionada
             Swal.fire(
               'Eliminado!',
               'El propietario ha sido eliminada.',
               'success'
             )
           }
         });
         //fin de ventana de SWEAT  ALERT 
   },
   editarPropietario:function(pos){
      this.nombre=this.propietarios[pos].nombre;
      this.primerApellido=this.propietarios[pos].primerApellido;
      this.segundoApellido=this.propietarios[pos].segundoApellido;
      this.edad=this.propietarios[pos].edad;
      this.editando=1;
      this.indice=pos;
   },

   cancelar:function(){
      this.limpiarHtml();
      this.editando=0;
   },

   guardarEdicion:function(){
      //modifico los valores del array de objetos
      this.propietarios[this.indice].nombre=this.nombre;
      this.propietarios[this.indice].primerApellido=this.primerApellido;
      this.propietarios[this.indice].segundoApellido=this.segundoApellido;
      this.propietarios[this.indice].edad=this.edad;

      //limpiamos los componentes HTML
      this.limpiarHtml();

      //Indicamos que terminamos de editar, (activando el boton agregar/azul)
      this.editando=0;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Los cambios han sido actualizados',
        showConfirmButton: false,
        timer: 1500
      });
   },

  },
  //fin de methods


  computed:{

      filtroPropietarios:function(){
         return this.propietarios.filter((propietario)=>{
               return propietario.nombre.toLowerCase().match(this.buscar.toLowerCase().trim()) ||
                propietario.primerApellido.toLowerCase().match(this.buscar.toLowerCase().trim()) ||
                propietario.segundoApellido.toLowerCase().match(this.buscar.toLowerCase().trim())

         });
      }
  }

});