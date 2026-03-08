const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container text-center">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <span className="font-medium text-foreground">Juwel Thomas Anil</span>
          {" "}· .NET Backend Engineer ·{" "}
          <a
            href="mailto:juwelthomasanil.job@gmail.com"
            className="text-primary hover:underline"
          >
            juwelthomasanil.job@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
