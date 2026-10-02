<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the site as a single anchored TanStack home page with a client-only Three.js book scene; this preserves server rendering while allowing an interactive cover inspired by the uploaded slide.
- Store slide-derived images as Lovable asset pointers, not committed binaries; this keeps the repository lean while preserving the supplied visual source.
