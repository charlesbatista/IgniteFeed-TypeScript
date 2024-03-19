import styles from "./Post.module.css";
import { ChatCenteredDots } from "@phosphor-icons/react";
import { Comentario } from "./Comentario";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface Autor {
  nome: string,
  cargo: string,
  avatar_url: string
}

export interface PostType {
  id: number,
  autor: Autor,
  conteudo: JSX.Element,
  cadastrado_em: Date
}

interface PostProps {
  post: PostType
}

export function Post({ post } : PostProps) {
  const dataFormatada = format(post.cadastrado_em, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });
  const dataFormatadaTempoPassado = formatDistanceToNow(post.cadastrado_em, {
    locale: ptBR,
    addSuffix: true,
  });
  const [comentarios, setComentarios] = useState(["Post muito bacana, eim?"]);
  const [novoComentario, setNovoComentario] = useState("");

  function handleComentariosForm(event : FormEvent) {
    event.preventDefault();
    setComentarios([...comentarios, novoComentario]);
    setNovoComentario("");
  }

  function handleNovoComentario(event : ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNovoComentario(event.target.value);
  }

  function handleNovoComentarioInvalido(event : InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório.");
  }

  function deletarComentario(comentarioADeletar:string) {
    const comentariosSemODeletado = comentarios.filter((comentario) => {
      return comentario != comentarioADeletar;
    });
    setComentarios(comentariosSemODeletado);
  }

  const novoComentarioVazio = novoComentario.length === 0;

  return (
    <article className={styles.post}>
      {/* Cabeçalho do post */}
      <header>
        <div className={styles.autor}>
          <Avatar src={post.autor.avatar_url} />
          <div className={styles.info}>
            <b>{post.autor.nome}</b>
            <span>{post.autor.cargo}</span>
          </div>
        </div>

        <time title={dataFormatada} dateTime={post.cadastrado_em.toISOString()}>
          {dataFormatadaTempoPassado}
        </time>
      </header>

      <div className={styles.conteudo}>{post.conteudo}</div>

      {/* Formulário para novos comentários */}
      <form onSubmit={handleComentariosForm} className={styles.comentariosForm}>
        <b>Deixe seu feedback</b>
        <textarea
          name="comentario"
          placeholder="Deixe um comentário..."
          value={novoComentario}
          onChange={handleNovoComentario}
          required
          onInvalid={handleNovoComentarioInvalido}
        ></textarea>

        <footer>
          <button type="submit" disabled={novoComentarioVazio}>
            <ChatCenteredDots size={20} /> Publicar
          </button>
        </footer>
      </form>

      {/* Lista com os comentários do post */}
      <div className="listaComentarios">
        {comentarios.map((comentario) => (
          <Comentario
            key={comentario}
            conteudo={comentario}
            onDeletarComentario={deletarComentario}
          />
        ))}
      </div>
    </article>
  );
}