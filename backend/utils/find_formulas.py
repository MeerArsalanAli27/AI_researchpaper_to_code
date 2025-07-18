

from typing import List
import re
def find_formulas(html: str) -> List[str]:
    """Extract LaTeX and MathML formulas from HTML"""
    latex_pattern = r'\$\$(.*?)\$\$|\$(.*?)\$'
    mathml_pattern = r'<math.*?>(.*?)</math>'
    formulas = re.findall(latex_pattern, html, re.DOTALL)
    mathml = re.findall(mathml_pattern, html, re.DOTALL)
    cleaned_formulas = [f[0] or f[1] for f in formulas if any(f)]
    return cleaned_formulas + mathml