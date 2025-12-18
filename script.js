let db;

initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}` }).then(SQL => {
    db = new SQL.Database();
});

function ejecutarSQL(tipo) {
    try {
        let comando;
        if(tipo === 'crear') comando = document.getElementById('crearTabla').value;
        else if(tipo === 'insertar') comando = document.getElementById('insertarDatos').value;
        else comando = document.getElementById('consultaSQL').value;

        if(!comando) return;

        if(tipo === 'consulta'){
            const res = db.exec(comando);
            if(res.length === 0){
                document.getElementById('resultados').textContent = "Sin resultados.";
            } else {
                // Mostrar resultados de la primera tabla devuelta
                const cols = res[0].columns;
                const values = res[0].values;
                let salida = cols.join(" | ") + "\n" + "-".repeat(cols.join(" | ").length) + "\n";
                values.forEach(fila => {
                    salida += fila.join(" | ") + "\n";
                });
                document.getElementById('resultados').textContent = salida;
            }
        } else {
            db.run(comando);
            document.getElementById('resultados').textContent = "¡Comando ejecutado!";
        }
    } catch(e){
        document.getElementById('resultados').textContent = "Error: " + e;
    }
}
