# projeto_cadastro
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Cadastro </title>
</head>
<body>
    
    <h1>Cadastro do paciente</h1>
    <div class="container_form">
                <div class="form_grupo">
                    <label for="nome" class="form_label">Nome</label>
                    <input type="text" name="nome" class="form_input" id="nome">
                </div>
                
                <div class="form_grupo">
                    <label for="responsavel" class="form_label">Enfermeira(o)</label>
                    <input type="responsavel" name="responsavel" class="form_input" id="responsavel" >
                </div>
                
                <div class="form_grupo">
                    <label for="datanascimento" class="form_label">Data de Nascimento</label>
                    <input type="date" name="datanascimento" class="form_input" id="dataNascimento" placeholder="Data de Nascimento" required>
                </div> 
                     
                <div class="form_grupo">
                    <label for="quarto" class="form_label">Leito</label>
                    <input type="number" name="Quartos" class="form_input" id="quarto" >
                </div>        

              

               
              
                    <div class="submit">

                      <input type="hidden" name="acao" value="enviar">
                      <button type="submit" name="Submit" class="submit_btn" >Cadastrar</button>
                     <ul>

                          </ul>
                    </div>
            </form>

    </div><!--container_form-->
</body>
<script src="script.js"></script>
</html>
    