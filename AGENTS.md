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

- Keep editable commercial content, offers, location stages, indicative times, and public navigation in `src/content/site.ts`; this allows future PIT STOP ADMIN integration without coupling copy to pages.
- Route the external appointment endpoint through validated server functions; this stabilizes the provider contract and keeps provider details out of the browser.
- Share offer status selection and presentation between home and the offers page; this prevents inactive or expired campaigns from appearing as bookable offers.
- Keep tyre enquiry as an explicitly unconnected client-side preview until a real provider is integrated; never imply a stock lookup or request submission occurred.
