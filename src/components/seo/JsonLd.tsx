import * as React from "react";

/**
 * Generischer Server-Komponenten-Injector für JSON-LD.
 *
 * Akzeptiert entweder ein einzelnes Schema-Objekt, ein Array
 * (wird zu einem @graph zusammengefasst) oder bereits einen
 * fertigen @graph. Rendert ein <script type="application/ld+json">.
 */
type Json = Record<string, unknown>;

interface Props {
  data: object | object[];
  /** Optional: id für das script-Tag (debugging). */
  id?: string;
}

export function JsonLd({ data, id }: Props) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : (data as Json)["@context"]
      ? data
      : { "@context": "https://schema.org", ...(data as Json) };

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}

export default JsonLd;
