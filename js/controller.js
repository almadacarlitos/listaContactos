
//Objeto de acceso a datos
 const persistence = new Persistence();
 let esNuevo = true;
 let indice = -1;

/*/ MENU*/
//selecciona el menu y agrega un evento click 
//con una funcion que maneja la logica del menu

$("ul li a ").click(function(){

	if( !$(this).hasClass('active') ){

	$("ul li a").toggleClass('active');
	$("#registros").toggle();
	$("#formulario").toggle();

	}

});

/* FORMULARIO*/
//GUARDAR

$("form").submit(  function( evento){

	evento.preventDefault();

//Objeto personas
let persona = {
	nombre: $("#nombre").val(),
	telefono: $("#telefono").val(),
	email: $("#email").val(),
	direccion: $("#direccion").val()

};

if(esNuevo){
	persistence.guardar( persona);
}else {
	persistence.modificar( persona, indice );
}

//Limpia el formulario
$('#btnCancelar').click();

//Carga de nuevo toda la tabla
cargaTabla();



});

$('#btnCancelar').click(function(event){
	esNuevo = true;
})


function editar( btn ){
	esNuevo = false;
	 indice = $(btn).parent().parent().index();
	let contacto = persistence.recuperarPorIndice( indice );

		$("#nombre").val( contacto.nombre );
		$("#telefono").val( contacto.telefono );
		$("#email").val( contacto.email );
		$("#direccion").val( contacto.direccion );


	$("#reg").click();

}

function eliminar ( btn ){
 indice = $( btn ).parent().parent().index();
 persistence.eliminar( indice );
 cargaTabla();
}

// TABlA

//Cargar Dato
//Carga todos los datos que hay en el localStroge
//recorriendo el array que se recupera por medio del
//metodo persistente.recuperaTodos()

function cargaTabla(){

//Elimina todos los items de la tabla, para vplvr a cargar
	$('#tbContactos tbody').html("");

	//recupera todos los datos en fomato de array de Objetos
	persistence.recuperarTodos().forEach( function ( elem, key ){

		let tmp = `<tr>
                    <th scope="row">${ key }</th>
                    <td>${elem.nombre}</td>
                    <td>${elem.telefono}</td>
                    <td>${elem.email}</td>
                    <td>${elem.direccion}</td>
                    <td>
                        <button onclick="editar(this)" class="bnt btn-outline-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="eliminar(this)" class="bnt btn-outline-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Eliminar">
                            <i class="fas fa-eraser"></i>
                        </button>
                    </td>
                </tr>`;


                //Agrega cada items reuperado de la localStorage
                //al final de la tabla
                $('#tbContactos tbody').append( tmp );

	});
}

cargaTabla();


function miFuncion (){};
let miFuncion2 = ()=>{}