import React from 'react';
import BackButton from '@/components/ui/BackButton';

export default function Modulo1Contenido() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-2 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 pt-12 relative">
        {/* Botón Volver en la esquina superior izquierda */}
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#ec4d58] mb-2 text-center">Criptomonedas. Herramientas Económicas</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Módulo 1: Introducción y la lógica económica</h2>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Introducción y la lógica económica</h3>
          <p className="mb-2">La economía actúa como complemento del derecho. Contribuye en la interactuación con clientes, tanto a nivel empresarial como estatal.</p>
          <ul className="list-disc list-inside mb-2">
            <li>¿Cómo escribir contratos que ayuden lograr los objetivos del negocio de la empresa?</li>
            <li>¿Cómo lograr que las regulaciones sirvan para promover metas sociales?</li>
                </ul>
          <p className="mb-2">A menudo se contempla al derecho "sólo" en su papel de proveedor de justicia.</p>
          <p className="mb-2">Con el estudio de la economía, se visualizan las leyes como incentivos para el cambio de comportamientos y como instrumentos para el logro de los objetivos de las políticas (eficiencia y distribución). Es por ello por lo que es sumamente conveniente entender que hay problemas económicos que son la génesis de las acciones legales del cliente (ej. monopolio, externalidades negativas, etc.)</p>
          <p className="mb-2">La Ley de divorcio, las tasas de criminalidad, los contratos, la eutanasia, el derecho de propiedad, las instituciones en el sentido amplio de la palabra, el sistema electoral, el aborto, las reparaciones por daños y perjuicios, las patentes, el Derecho internacional, la decisión de anotarse en la Facultad, el Derecho Constitucional, la contaminación ambiental, el Derecho Laboral y naturalmente el Tributario también, son algunos de los temas en que la Economía y el Derecho se dan la mano.</p>
          <p className="mb-2">Estudiar economía es una excelente inversión para aprender a interpretar un cuerpo normativo, no ya por la intención declarada de su letra, sino por los hechos jurídicos que efectivamente produce.</p>
          <p className="mb-2">En efecto, el estudio de las consecuencias económicas de una norma permite conocer hasta qué punto ésta es apropiada a los objetivos que su cuerpo declarativo enumera.</p>
          <p className="mb-2">Ya mostramos que cuando la Constitución dice que la educación es gratuita solo contempla el no pago de aranceles, pero no garantiza de ninguna manera que ésta no sea costosa para el alumno.</p>
          <p className="mb-2 italic">Tetaz, Martín (2006) Economía para Abogados.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">La palabra economía</h3>
          <p className="mb-2">La palabra economía proviene del griego "quien administra el Hogar" (Tetaz Martín; 2006). Decisiones en cada hogar: el objetivo es asignar los escasos recursos para satisfacer la mayor cantidad de necesidades.</p>
          <p className="mb-2 font-semibold">Glosario:</p>
          <ul className="list-disc list-inside mb-2">
            <li><b>Escasez:</b> significa que la sociedad tiene recursos limitados y debido a ello, no puede producir todos los bienes y servicios que serían deseables. La administración de los recursos de una sociedad es importante porque éstos son escasos.</li>
                </ul>
          <p className="mb-2">La economía entrena para pensar en términos de alternativas, evaluar los costos y beneficios de las elecciones privadas (empresas o individuos) y sociales, examinar y comprender cómo se relacionan determinados sucesos y tópicos.</p>
          <p className="mb-2">Un ejemplo más concreto de las relaciones entre la economía y el derecho es el de la legislación tributaria, en el que puede existir una diferencia muy grande entre la aparente voluntad del legislador y el efecto económico final de la norma.</p>
          <p className="mb-2">Es sabido que a nadie le gusta pagar impuestos, por lo que establecido el mismo por la ley, el sujeto de derecho de la obligación hará cuanto esté a su alcance por "endosarle" la carga del tributo a otros. Si éste es un productor es probable que traslade parte de la carga a los consumidores hacia adelante y si no lograra hacerlo, intentará que sus empleados absorban el coste vía una reducción de salarios, trasladando hacia atrás la carga.</p>
          <p className="mb-2">Si el contribuyente de iure es un consumidor, este puede simplemente dejar de consumir el bien gravado y sustituirlo por otro, con lo que el productor obtendrá un menor precio –neto de impuesto– y terminará por tanto absorbiendo parte de la carga.</p>
          <p className="mb-2">Solo de casualidad, el impacto económico final se corresponderá con el que surge de la interpretación literal de la norma, y en todo caso el legislador deberá ser muy cuidadoso para garantizar que la ley efectivamente cumpla con el propósito para el que es dictada.</p>
          <p className="mb-2">Naturalmente esto no agota, ni mucho menos, la relación entre la economía y el derecho.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Microeconomía y Macroeconomía</h3>
          <p className="mb-2">A nivel general, la Microeconomía se focaliza en las unidades individuales de la economía. Cómo las familias y empresas toman sus decisiones y cómo interactúan en mercados específicos. Mientras que la Macroeconomía mira a la economía como un todo. Cómo los mercados interactúan a nivel nacional.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Principios Básicos de la Microeconomía</h3>
          <ol className="list-decimal list-inside mb-2 space-y-2">
            <li><b>La gente enfrenta disyuntivas (trade off):</b> El comportamiento de una economía refleja el comportamiento de sus individuos. Por cada hora que el abogado destine a estudiar una nueva causa, automáticamente dejará de contestar un requerimiento durante ese tiempo. Las leyes necesarias para hacer que las empresas contaminen menos provocan que los costos de producción de los bienes y servicios aumenten y, debido a estos costos más altos, las empresas ganan menos, o pagan salarios más bajos o venden los bienes a precios más altos, o crean una combinación de estas variables.</li>
            <li><b>El costo de una cosa es aquello a lo que se renuncia para obtenerla:</b> El costo de oportunidad de una cosa es aquello a lo que renunciamos para conseguirla. Si decidimos seguir capacitándonos seguramente dejaríamos de generar honorarios mientras dure dicha capacitación, pero en el futuro esos honorarios crecerán considerablemente.</li>
            <li><b>Las personas racionales piensan en términos marginales:</b> Las personas racionales saben que las decisiones en la vida raras veces se traducen en elegir entre lo blanco y lo negro y, generalmente, existen muchos matices de grises. Un tomador de decisiones racional emprende una acción si y sólo si el beneficio marginal de esta acción es mayor al costo marginal.</li>
            <li><b>Las personas responden a los incentivos:</b> Un incentivo es algo que induce a las personas a actuar y puede ser una recompensa o un castigo. Los incentivos son fundamentales cuando se analiza cómo funcionan los mercados.</li>
            <li><b>El comercio puede mejorar el bienestar de todos:</b> El comercio permite a cada persona especializarse en las actividades que mejor realiza, ya sea cultivar el campo, coser o construir casas. El comerciar permite a las personas comprar una mayor variedad de bienes y servicios a un menor precio.</li>
            <li><b>Los mercados normalmente son un buen mecanismo para organizar la actividad económica:</b> En una economía de mercado, las decisiones que antes se tomaban de manera centralizada son sustituidas por las decisiones de millones de empresas y familias.</li>
            <li><b>El gobierno puede mejorar algunas veces los resultados del mercado:</b> Una de las razones por las cuales necesitamos al gobierno es porque la magia de la mano invisible de la economía sólo funciona cuando aquél hace valer las reglas y mantiene las instituciones que son clave para el libre mercado.</li>
            <li><b>El nivel de vida de un país depende de la capacidad que tenga para producir bienes y servicios:</b> Casi todas las variaciones de los niveles de vida pueden atribuirse a las diferencias existentes entre los niveles de productividad de los países.</li>
            <li><b>Cuando el gobierno imprime demasiado dinero los precios se incrementan:</b> Inflación es el crecimiento sostenido y generalizado del nivel general de precios. Cuando un gobierno emite grandes cantidades de dinero, el valor de éste disminuye.</li>
            <li><b>La sociedad enfrenta a corto plazo una disyuntiva entre inflación y desempleo:</b> En la economía, un incremento en la cantidad de dinero estimula el nivel total el gasto y, por ende, estimula también la demanda de bienes y servicios.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Surgimiento de las criptomonedas</h3>
          <p className="mb-2">En 1998 el criptógrafo Wei Dai publicó su idea de evitar la necesidad de intermediarios en las transacciones de pago electrónico. Su idea era crear un sistema de intercambio de valor y ejecución de contratos basados en una moneda electrónica no rastreable, que le permitiera a sus dueños mantenerse anónimos.</p>
          <p className="mb-2">En 2009 un programador bajo el alias de Satoshi Nakamoto llevó a la realidad la idea de Dai al crear una moneda cuasi anónima: el Bitcoin, la primera moneda digital descentralizada de la historia. Satoshi Nakamoto publicó un documento denominado "Bitcoin: A peer to peer Electronic Cash System", que en español se debería traducir como Bitcoin, un sistema de dinero electrónico entre pares.</p>
          <p className="mb-2">La verdadera identidad de Satoshi sigue siendo desconocida hasta el día de hoy. Según sus propias declaraciones realizadas el 2012, él era un hombre de 37 años que vivía en algún lugar de Japón. Sin embargo, hay muchas dudas sobre esto, por ejemplo, escribe en inglés con fluidez y el software de Bitcoin no está documentado en japonés, lo que lleva a muchos a pensar que, en realidad, no es japonés.</p>
          <p className="mb-2">¿Alguna vez sabremos quién es el creador de Bitcoin? ¿O se trata de un equipo de personas? Puede que nunca lo sepamos, pero una cosa es segura: Esta persona o personas controlan aproximadamente un millón de Bitcoins.</p>
          <p className="mb-2">Las criptomonedas son archivos, bits con datos (como los populares PDF o MP3) que buscan cumplir todas y cada una de las funciones que se le asignan al dinero tradicional, pero usando la web como medio de transmisión.</p>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-bold mb-2">Bibliografía</h3>
          <ul className="list-disc list-inside">
            <li>Mankiw, N. Gregory, Principles of Economics, Sixth Edition, South-Western, Cengage Learning, 2012</li>
            <li>Tetaz, Martín, Economía para Abogados, UNLP, 2006</li>
                </ul>
        </section>

        {/* Botón Volver al final del texto, del lado izquierdo */}
        <div className="mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
} 