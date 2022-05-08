export default function defaultCodeByLanguage(language: string) {
  switch (language) {
    case 'javascript':
      return `// write your code here`;
    case 'python':
      return `# write your code here`;
    case 'rust':
      return (   
`fn main() {
  // write your code here
}`
      );
    case 'java':
      return (
`class HelloWorld {
  public static void main(String[] args) {
      // write your code here
    }
}`
      );
    default:
      return '';
  }
}
